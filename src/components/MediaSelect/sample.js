import { extendTheme } from '@chakra-ui/react'

import { theme } from '../../const/theme'

export const extendedTheme = extendTheme(
    Object.assign({}, theme, {
        config: {
            cssVarPrefix: 'c',
        },
        breakpoints: {
            mobile: '480px',
            tablet: '768px',
            desktop: '1280px',
            desktopPlus: '1280px',
        },
        styles: {
            global: {
                'html, body': {
                    fontFamily:
                        "'Amazon Ember', Arial, sans-serif, 'Noto Sans HK'",
                },
                a: {
                    color: 'blue.800',
                },
            },
        },
        components: {
            Button: {
                defaultProps: {
                    colorScheme: 'yellow',
                },
            },
            Spinner: {
                defaultProps: {
                    emptyColor: 'gray.200',
                    color: 'blue.500',
                    thickness: '8px',
                },
            },
            DataTable: {
                bgColor: '#fff',
                fontSize: 1,
                borderWidth: 1,
                widgetSize: 'md',
                Actions: {
                    bgColor: '#37c',
                    GlobalSearch: {
                        bgColor: '#f77',
                        iconColor: '#0f0',
                        size: 'sm',
                    },
                    TotalRecords: {
                        fontSize: 0.8,
                        padding: 0.5,
                    },
                    ToggleButtons: {
                        colorScheme: 'gray',
                        size: 'sm',
                    },
                },
                Header: {
                    fontSize: 1,
                    fontWeight: 600,
                    widgetSize: 'sm',
                    bgColor: '#fff',
                    borderBottomWidth: '1px',
                    borderColor: '#f00',
                    Search: {
                        size: 'lg',
                        bgColor: '#000',
                        variant: 'unstyled',
                    },
                    Slider: {
                        size: 'xs',
                    },
                    Range: {
                        size: 'lg',
                        bgColor: '#a3e',
                    },
                    Dropdown: {
                        size: 'sm',
                        bgColor: '#eee',
                    },
                },
                Body: {
                    Row: {
                        fontSize: 0.8,
                        borderWidth: '1px',
                        borderColor: '#abc',
                        bgColor: '#333',
                        hoverBorderWidth: '3px',
                        hoverBorderColor: '#00f',
                    },
                    Cell: {
                        fontSize: 1.2,
                        padding: 0.4,
                    },
                },
            },
        },
    })
)

export const gallery = [
    {
        src: 'https://images.unsplash.com/photo-1626972309141-bee9f36a0499',
        thumbnail:
            'https://images.unsplash.com/photo-1626972309141-bee9f36a0499',
        title: 'this is some',
        description: 'sample image',
        fileName: 'unplash',
    },
    {
        src: 'https://images.unsplash.com/photo-1627241384307-085049264cc1',
        thumbnail:
            'https://images.unsplash.com/photo-1627241384307-085049264cc1',
        title: 'this is',
        description: 'another image',
        fileName: 'unplash',
    },
    {
        src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        thumbnail:
            'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        title: 'this is',
        description: 'a video',
        type: 'video',
        fileName: 'learning',
    },
]
