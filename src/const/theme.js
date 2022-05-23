const defaultValues = {
    // in rem
    fontSize: {
        mini: '0.6',
        small: '0.8',
        medium: '1',
        large: '1.1',
        xl: '1.5',
    },
    fontWeight: {
        regular: 400,
        bold: 700,
    },
    // color variations
    colorSet1: {
        primary: '#232F3E', ///#162A38  #232F3E  rgba(23,52,85)
        secondary: '#f0c14b',
        text: '#000000',
        error: 'red',
    },

    colorSet2: {
        primary: '#0f4c81',
        secondary: '#93bde2',
        error: '#e77600',
    },

    backgroundColor: '#ffffff',
    lightBlueBackgroundColor: '#37475a',
    lightBackgroundColor: '#cccccc',
    darkBackgroundColor: '#8a8a8a',
    errorBackgroundColor: '#fff5f5',
    glassBackgroundColor: 'rgb(0,0,0, 0.4)',
    transparentLightBackgroundColor: 'rgba(255, 255, 255, 0.75)',

    shadow: [
        'rgba(255, 255, 255, 0.5)',
        'rgba(228, 121, 17, 0.5)',
        'rgba(57, 73, 76, 0.35)',
    ],

    // in rem
    borderRadius: {
        small: '0.15',
        normal: '0.5',
        big: '1',
        large: '3',
    },

    // in px
    borderWidth: {
        veryThin: '0.5',
        thin: '1',
        medium: '2',
        thick: '4',
    },

    // transition
    timeTransition: {
        slow: '0.2s',
        medium: '0.5s',
        fast: '0.8s',
    },
}

export const theme = {
    // basic setup
    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
        desktopPlus: '1280px',
    },
    fonts: ['Amazon Ember', 'Arial', 'sans-serif'],

    buttonComponents: {
        primaryColor: defaultValues.colorSet1.primary,
        secondaryColor: defaultValues.colorSet1.secondary,
        backgroundSelected: defaultValues.colorSet1.secondary,
        backgroundNotSelected: defaultValues.backgroundColor,
        fontSize: defaultValues.fontSize.medium,
        borderWidth: defaultValues.borderWidth.thin,
        borderRadiusLangSelect: defaultValues.borderRadius.small,
        borderRadiusSubmit: defaultValues.borderRadius.mini,
        timeTransition: defaultValues.timeTransition.medium,
    },

    dataTable: {
        background: '#fac',
        loaderPrimaryColor: defaultValues.darkBackgroundColor,
        loaderSecondaryColor: defaultValues.colorSet2.primary,
        GlobalSearch: {
            bgColor: '#fff',
            size: 'xs',
        },

        fontSize: defaultValues.fontSize.medium,
        headerFontWeight: 500,

        borderWidth: 0,
        borderColor: '#f00',

        shadowFocus: defaultValues.shadow[1],
        hoverColor: defaultValues.colorSet1.primary,
        borderColorFocus: defaultValues.colorSet2.error,
    },

    formikComponents: {
        borderRadius: defaultValues.borderRadius.small,
        checkedBackgroundColor: defaultValues.lightBlueBackgroundColor,
        hoverBackgroundColor: defaultValues.lightBackgroundColor,
    },

    fileUploadDropZone: {
        fontSize: defaultValues.fontSize.medium,
    },
}

export const up = (breakpointName) => {
    const breakpoint = theme.breakpoints[breakpointName]

    return `@media (min-width: ${breakpoint})`
}

export const down = (breakpointName) => {
    const breakpoint = theme.breakpoints[breakpointName]

    return `@media (max-width: ${breakpoint})`
}
