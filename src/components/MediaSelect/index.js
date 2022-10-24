import React, { useEffect, useState } from 'react'
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react'

import DefaultContainer from './Container'
import DefaultMediaItem from './MediaItem'
import DefaultMediaFilters from './MediaFilters'
import DefaultThumbnails from './Thumbnails'
import MediaDisplay from '../MediaDisplay'

const MediaSelect = ({
    value: nonFormikValue,
    field: { name: fieldName, value: formikValue } = {
        name: null,
        value: null,
    },
    form: { setFieldValue } = { setFieldValue: null },
    multiple = false,
    gallery = [],
    itemWidth = 180,
    itemHeight = 180,
    onSelect,
    container = DefaultContainer,
    thumbnails = DefaultThumbnails,
    mediaItem = DefaultMediaItem,
    mediaFilters = DefaultMediaFilters,
    openButtonLabel = 'Select media',
    selectButtonLabel = 'Select',
    closeButtonLabel = 'Close',
    isDisabled = false,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    let value = nonFormikValue || formikValue
    if (multiple) {
        value = !value ? [] : !Array.isArray(value) ? [value] : value
    }

    const updateValue =
        onSelect ||
        ((v) => {
            setFieldValue(fieldName, v)
        })

    // Internal value of this component
    const [valueInternal, setValueInternal] = useState(
        multiple ? [] : undefined
    )

    // Add "selected" property to each gallery item
    useEffect(() => {
        // If the gallery items have "id" property,
        // mark items as selected by comparing their ids
        // else comparing by their references
        const hasId = gallery.some((gal) => gal.hasOwnProperty('id'))
        const ids = multiple ? value?.map((g) => g.id) || [] : [value?.id]

        gallery.forEach((gal) => {
            if (hasId) {
                gal.selected = ids.includes(gal.id)
            } else {
                gal.selected = multiple
                    ? value.includes(gal)
                    : [value].includes(gal)
            }
        })
    }, [gallery])

    // Set component's internal state value based on the provided "value" property's value
    useEffect(() => {
        setValueInternal(value)
    }, [value])

    // Media item's on-click handler
    const selectMedia = (media) => {
        if (multiple) {
            if (media.selected) {
                media.selected = false
                setValueInternal((pre) => pre.filter((item) => item.selected))
            } else {
                media.selected = true
                setValueInternal((pre) => [...pre, media])
            }
        } else {
            updateValue(getSelectedSingleMedia(valueInternal, media))

            onClose()
        }
    }

    // Cancel button on click
    const cancel = () => {
        // Un-select items in the modal
        if (valueInternal && multiple) {
            valueInternal.forEach((val) => {
                val.selected = false
            })

            value.forEach((val) => {
                val.selected = true
            })
        } else if (valueInternal) {
            valueInternal.selected = [value].indexOf(valueInternal) >= 0
        }

        // Re-choose the currently selected items
        setValueInternal(value)

        onClose()
    }

    // "Select" button on click
    const selectBtnOnClick = () => {
        if (multiple) {
            updateValue(valueInternal)
        }

        onClose()
    }

    const Container = container
    const MediaItem = mediaItem
    const MediaFilters = mediaFilters
    const Thumbnails = thumbnails

    return (
        <Container>
            {!isDisabled && (
                <Button onClick={onOpen} className="media-select-button">
                    {openButtonLabel}
                </Button>
            )}
            <Thumbnails items={value} />
            <Modal size="3xl" isOpen={isOpen} onClose={cancel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <MediaDisplay
                            data={gallery}
                            width={itemWidth}
                            height={itemHeight}
                            components={{ MediaItem }}
                            onSelect={selectMedia}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={cancel} colorScheme="gray">
                            {closeButtonLabel}
                        </Button>
                        {multiple && (
                            <Button
                                onClick={selectBtnOnClick}
                                colorScheme="yellow"
                                ml="2"
                            >
                                {selectButtonLabel}
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

// Determine the media item to be selected
function getSelectedSingleMedia(pre, newVal) {
    if (pre && pre.selected === newVal.selected) {
        newVal.selected = !newVal.selected

        if (newVal.selected) return newVal
        return null
    } else if (pre) {
        pre.selected = false
        newVal.selected = true

        return newVal
    } else {
        newVal.selected = true

        return newVal
    }
}

export default MediaSelect
