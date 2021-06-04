import os

SRC = '/mnt/wsl/Uber_Eats_Clone/frontend/src'

TAILWIND_FILE = 'tailwind.scss'
TAILWIND = os.path.join(SRC, TAILWIND_FILE)

STYLES_FOLDER = 'styles'
STYLES = os.path.join(SRC, STYLES_FOLDER)

scss = []


for root, _, files in os.walk(STYLES):
    for name in files:
        splitted = name.split('.')
        if (
            splitted[-1] in ['scss', 'css'] and
            splitted[0][0] != '_'
        ):
            file = os.path.join(root, name)
            with open(file, 'r') as f:
                codes = f.readlines()
                for code in codes:
                    if code[0:2] != '//':  # Ignoring comments
                        scss.append(code)
                f.write('\n')


tailwind_commands = {
    'headers': [
        '@tailwind base;',
        '\n',
        '@tailwind components;',
        '\n',
    ],
    'footers': [
        '\n',
        '@tailwind utilities;',
        '\n',
    ]
}


with open(TAILWIND, 'w') as f:
    for code in [*tailwind_commands['headers'], *scss, *tailwind_commands['footers']]:
        f.write(code)
