"""
This script contains some constants and functions used by the other scripts.
"""

# Constants
SOURCE_DIR = 'src'
OUTPUT_DIR = 'out'
BASE_FILE = SOURCE_DIR + '/_base.html'
GOOGLE_OWNERSHIP_VERIFICATION_FILE = ''  # TODO: Add this

DATA_BLOCK_MARKER = '{% block data %}'
META_BLOCK_MARKER = '{% block meta %}{% endblock %}'
START_OF_META_BLOCK_MARKER = '{% block meta %}'
CONTENT_BLOCK_MARKER = '{% block content %}{% endblock %}'
START_OF_CONTENT_BLOCK_MARKER = '{% block content %}'
END_OF_BLOCK_MARKER = '{% endblock %}'

TITLE_DEFAULT = 'হাসান নাহিয়ান নোবেল'
DESCRIPTION_DEFAULT = 'ওয়েবসাইট: হাসান নাহিয়ান নোবেল'
IMAGE_DEFAULT = ('https://hasannahiyannobel.github.io/images/cover_web_preview'
                 '.png')
AUTHOR_DEFAULT = 'হাসান নাহিয়ান নোবেল'
OG_TYPE_DEFAULT = 'website'
URL_DEFAULT = 'https://hasannahiyannobel.github.io'
TWITTER_DOMAIN_DEFAULT = 'hasannahiyannobel.github.io'
TWITTER_CARD_DEFAULT = 'summary_large_image'

COPYRIGHT_LINE = ('<!--\n---- এখানে কী চাই? 🤨\n---- এই ফাইলটা পাইথন '
                  'ফ্রেমওয়ার্ক দিয়ে নির্মিত, এবং এইচটিএমএল মিনিফায়ার (এনপিএম) '
                  'দিয়ে ক্ষুদ্রীকৃত।\n---- অধিকার ২০২১-২৪, হাসান নাহিয়ান '
                  'নোবেল।\n--->')


# Functions
def prepend_line(filepath, line_to_prepend):
    """
    Prepend lines at the beginning of a file.
    Concept from https://stackoverflow.com/a/5917395.

    :param filepath: Path of the file.
    :param line_to_prepend: The line to prepend.
    :return: Nothing.
    """
    with open(filepath, 'r+', encoding='utf-8') as a_file:
        content = a_file.read()
        a_file.seek(0, 0)
        a_file.write(line_to_prepend.rstrip('\r\n') + '\n' + content)


def read_block(file, is_body=False):
    """
    Read lines from a file until the end of block marker is read. Additionally,
    adds a &NoBreak; before every em dash.

    :param file: The file from which the lines are being read.
    :param is_body: If the block being read goes inside the <body> tag, this
    boolean value is True.
    :return: The read lines as an array.
    """
    block = []
    for line in file:
        if line.strip() == END_OF_BLOCK_MARKER:
            break
        if is_body:
            line = line.replace('—', '&NoBreak;—')
        block.append(line)
    return block


def english_to_bangla_number(number=None):
    """
    A slowww, but effective function to convert English numbers to Bangla,
    as a string.

    :param number: The number to be translated.
    :return: The translated number in Bangla, as a string. If the input is not
    parsed as a number, and empty string is returned.
    """
    if number is None:
        # No argument has been passed, return an empty string.
        return ''

    try:
        float(number)  # Check whether input is a number.
        bangla_digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
        english_digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        number = number.__str__()
        for i, digit in enumerate(english_digits):
            number = [sub.replace(digit, bangla_digits[i]) for sub in number]
        return ''.join(number)

    # Input hasn't been parsed as a number. Return an empty string.
    except ValueError:
        return ''
    except TypeError:
        return ''


def set_title(tags):
    if 'title' in tags:
        title = tags['title']
        title_meta = ['<title>', title, ' – ', TITLE_DEFAULT, '</title>']
    else:
        title = TITLE_DEFAULT
        title_meta = ['<title>', title, '</title>']
    title_meta += [
        '<meta property="og:title" content="', title, '">',
        '<meta name="twitter:title" content="', title, '">'
    ]
    return title_meta


def set_description(tags):
    if 'description' in tags:
        description_meta = tags['description']
    else:
        description_meta = DESCRIPTION_DEFAULT
    description_meta = [
        '<meta name="description" content="', description_meta, '...">',
        '<meta property="og:description" content="', description_meta, '...">',
        '<meta name="twitter:description" content="', description_meta, '...">'
    ]
    return description_meta


def set_image(tags):
    if 'image' in tags:
        image_meta = tags['image']
    else:
        image_meta = IMAGE_DEFAULT
    image_meta = [
        '<meta property="og:image" content="', image_meta, '">',
        '<meta name="twitter:image" content="', image_meta, '">',
        '<meta name="image" property="og:image" content="', image_meta, '">'
    ]  # The last one is for LinkedIn
    return image_meta


def set_author(tags):
    if 'author' in tags:
        author_meta = tags['author']
    else:
        author_meta = AUTHOR_DEFAULT
    author_meta = ['<meta name="author" content="', author_meta, '">']
    return author_meta


def set_og_type(tags):
    if 'og_type' in tags:
        og_type_meta = tags['og_type']
    else:
        og_type_meta = OG_TYPE_DEFAULT
    og_type_meta = ['<meta property="og:type" content="', og_type_meta, '">']
    return og_type_meta


def set_url(tags):
    if 'url' in tags:
        url_meta = tags['url']
    else:
        url_meta = URL_DEFAULT
    url_meta = [
        '<meta property="og:url" content="', url_meta, '">',
        '<meta property="twitter:url" content="', url_meta, '">'
    ]
    return url_meta


def set_twitter_domain(tags):
    if 'twitter_domain' in tags:
        twitter_domain_meta = tags['twitter_domain']
    else:
        twitter_domain_meta = TWITTER_DOMAIN_DEFAULT
    twitter_domain_meta = [
        '<meta property="twitter:domain" content="', twitter_domain_meta, '">'
    ]
    return twitter_domain_meta


def set_twitter_cards(tags):
    if 'twitter_card' in tags:
        twitter_card_meta = tags['twitter_card']
    else:
        twitter_card_meta = TWITTER_CARD_DEFAULT
    twitter_card_meta = [
        '<meta name="twitter:card" content="', twitter_card_meta, '">'
    ]
    return twitter_card_meta
