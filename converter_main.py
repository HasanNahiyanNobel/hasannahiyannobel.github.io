"""
This converter generates static html files from a base template and source files (a bit like Django!).
Copyright © 2021-22 by Hasan Nahiyan Nobel.
"""

# Imports
from os import listdir
from os.path import isfile, join
from converter_utilities import *
import os.path
import glob
import json

# Variables
pre_meta_tags = []
meta_tags = []
pre_content = []
content = []
post_content = []

meta_title = ''
meta_description = ''
meta_image = ''
meta_author = ''
meta_og_type = ''
meta_url = ''
meta_twitter_domain = ''
meta_twitter_card = ''

# Format every .py file using yapf Google style
py_files = glob.glob('*.py')
for py_file in py_files:
    os.system('yapf ' + py_file + ' -i --style google --no-local-style')

# Read pre- and post-contents from base file
with open(BASE_FILE, encoding='utf-8') as f:
    for line in f:
        if line.strip() == META_BLOCK_MARKER:
            break
        pre_meta_tags.append(line)

    for line in f:
        if line.strip() == CONTENT_BLOCK_MARKER:
            break
        pre_content.append(line)

    for line in f:
        post_content.append(line)

# Make a list of the source files. Concept from: https://stackoverflow.com/a/3207973.
source_files = [
    f for f in listdir(SOURCE_DIR) if isfile(join(SOURCE_DIR, f)) and
    f[0] != '_' and os.path.splitext(f)[1] == '.html'
]  # Files starting with an underscore are template files, so they are not included in this list. Also, we are processing only html files.

for source_file in source_files:
    # Read the source file
    source_path = SOURCE_DIR + '\\' + source_file
    with open(source_path, encoding='utf-8') as f:
        for line in f:
            current_line = line.strip()
            if current_line == START_OF_META_BLOCK_MARKER:
                meta_tags = read_block(f)
                meta_tags = ''.join(meta_tags)
                meta_tags = json.loads(meta_tags)

                meta_title = set_title(meta_tags)
                meta_description = set_description(meta_tags)
                meta_image = set_image(meta_tags)
                meta_author = set_author(meta_tags)
                meta_og_type = set_og_type(meta_tags)
                meta_url = set_url(meta_tags)
                meta_twitter_domain = set_twitter_domain(meta_tags)
                meta_twitter_card = set_twitter_cards(meta_tags)

                meta_tags = meta_title
                meta_tags += meta_description
                meta_tags += meta_image
                meta_tags += meta_author
                meta_tags += meta_og_type
                meta_tags += meta_url
                meta_tags += meta_twitter_domain
                meta_tags += meta_twitter_card

            if current_line == START_OF_CONTENT_BLOCK_MARKER:
                content = read_block(f, True)

    # Write the contents in respective output files
    output_path = OUTPUT_DIR + '\\' + source_file
    with open(
            output_path, 'w+', encoding='utf-8'
    ) as f:  # The 'w+' option creates the file if it does not exist already
        f.writelines(pre_meta_tags + meta_tags + pre_content + content +
                     post_content)

    # Clean the arrays
    fluid_content = []
    content = []

# Make a list of the output files
output_files = [
    f for f in listdir(OUTPUT_DIR)
    if isfile(join(OUTPUT_DIR, f)) and os.path.splitext(f)[1] == '.html'
]  # Output directory may contain files other than html—so this extra check is included in if-condition.

# Remove the output files which have been deleted from source files
for output_file in output_files:
    if not (source_files.__contains__(output_file)) and not (
            output_file == GOOGLE_OWNERSHIP_VERIFICATION_FILE
    ):  # Exclude the Google ownership verification file from deletion
        os.remove(OUTPUT_DIR + '\\' +
                  output_file)  # Remove the file from directory
        output_files.remove(output_file)  # Also remove the file from list
        print('Deleted: ' + output_file)

# Minify the script using html-minifier (https://www.npmjs.com/package/html-minifier)
os.system(
    'html-minifier --collapse-whitespace --minify-js true --no-html5 --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --input-dir '
    + OUTPUT_DIR + ' --output-dir ' + OUTPUT_DIR + ' --file-ext html')

# Add copyright lines to the minified files
for output_file in output_files:
    prepend_line(OUTPUT_DIR + '\\' + output_file, COPYRIGHT_LINE)

# Move the files from output to root directory
for output_file in output_files:
    current_path = OUTPUT_DIR + '\\' + output_file
    new_path = output_file
    os.replace(current_path, new_path)
