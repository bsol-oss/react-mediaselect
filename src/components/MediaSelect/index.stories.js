import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ChakraProvider, Form } from '@chakra-ui/react'
import { Field, Formik } from 'formik'

import MediaSelect from './index'
import { extendedTheme, gallery } from './sample'
import GlobalStyles from '../../const/globalStyles'

const FormikFormContainer = styled.div`
    form {
        border: none;
    }
`

export const FormikForm = styled(Form)`
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 5% auto;
    max-width: 25rem;
`

export const NormalComponent = () => {
    const [item, setItem] = useState(null)

    return (
        <ChakraProvider theme={extendedTheme}>
            <>
                <GlobalStyles />
                <MediaSelect
                    value={item}
                    onSelect={(val) => {
                        setItem(val)
                    }}
                    gallery={gallery}
                />
            </>
        </ChakraProvider>
    )
}

export const DisableComponent = () => {
    const [item, setItem] = useState(null)

    return (
        <ChakraProvider theme={extendedTheme}>
            <>
                <GlobalStyles />
                <MediaSelect
                    isDisabled={true}
                    value={item}
                    onSelect={(val) => {
                        setItem(val)
                    }}
                    gallery={gallery}
                />
            </>
        </ChakraProvider>
    )
}

export const NormalComponentMultiple = () => {
    const [items, setItems] = useState([])

    return (
        <ChakraProvider theme={extendedTheme}>
            <>
                <GlobalStyles />
                <MediaSelect
                    value={items}
                    onSelect={(val) => {
                        setItems(val)
                    }}
                    gallery={gallery}
                    multiple={true}
                />
            </>
        </ChakraProvider>
    )
}

export const FormikComponent = () => (
    <ChakraProvider theme={extendedTheme}>
        <GlobalStyles />
        <FormikFormContainer>
            <Formik
                initialValues={{
                    media: null,
                }}
                onSubmit={(values, actions) => {
                    actions.setStatus('')
                }}
            >
                <FormikForm>
                    <Field
                        name="media"
                        component={MediaSelect}
                        gallery={gallery}
                    />
                </FormikForm>
            </Formik>
        </FormikFormContainer>
    </ChakraProvider>
)

export const FormikComponentMultiple = () => (
    <ChakraProvider theme={extendedTheme}>
        <GlobalStyles />
        <FormikFormContainer>
            <Formik
                initialValues={{
                    medias: [],
                }}
                onSubmit={(values, actions) => {
                    actions.setStatus('')
                }}
            >
                <FormikForm>
                    <Field
                        name="medias"
                        component={MediaSelect}
                        gallery={gallery}
                        multiple={true}
                        openButtonLabel="Select medias"
                    />
                </FormikForm>
            </Formik>
        </FormikFormContainer>
    </ChakraProvider>
)

export default { title: 'Media Select', component: MediaSelect }
