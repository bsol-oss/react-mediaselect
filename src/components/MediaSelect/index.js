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
    value: nonFormikValue, // selected media item(s)
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
    modalSize = '3xl', // can be one of ['xs', 'sm', 'md', 'lg', 'xl', 'full']
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

    // Internal gallery & value (selected items) of this component
    const [valueInternal, setValueInternal] = useState([])
    const [galleryInternal, setGalleryInternal] = useState([])

    // Recheck selected items when the modal is open
    useEffect(() => {
        if (isOpen) {
            setValueInternal(
                getInitialValue(nonFormikValue, formikValue, multiple)
            )
            setGalleryInternal(
                getInitialGallery(
                    gallery,
                    nonFormikValue,
                    formikValue,
                    multiple
                )
            )
        }
    }, [isOpen])

    // Select media item
    const selectMedia = (media) => {
        if (multiple) {
            if (media.selected) {
                media.selected = false
                setValueInternal((pre) =>
                    pre.filter((item) => item.id !== media.id)
                )
            } else {
                media.selected = true
                setValueInternal((pre) => {
                    if (pre.some((i) => i.id === media.id)) return pre
                    else return [...pre, media]
                })
            }
        } else {
            const newSelectedItem = getSelectedSingleMedia(valueInternal, media)

            setValueInternal(newSelectedItem)
            updateValue(newSelectedItem)
            onClose()
        }
    }

    // Cancel button click handler
    const cancel = () => {
        // Re-select the currently selected items
        setValueInternal(getInitialValue(nonFormikValue, formikValue, multiple))
        setGalleryInternal(
            getInitialGallery(gallery, nonFormikValue, formikValue, multiple)
        )

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
            <Modal size={modalSize} isOpen={isOpen} onClose={cancel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <MediaDisplay
                            data={galleryInternal}
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

function getInitialValue(nonFormikValue, formikValue, multiple) {
    let value = nonFormikValue || formikValue
    if (multiple) {
        value = !value ? [] : !Array.isArray(value) ? [value] : value
    }

    return value
}

function getInitialGallery(gallery, nonFormikValue, formikValue, multiple) {
    const selectedItems = getInitialValue(nonFormikValue, formikValue, multiple)

    // If the gallery items have "id" property,
    // mark items as selected by comparing their ids
    // else comparing by their references
    const itemsHasId = hasId(gallery)
    const ids = multiple
        ? selectedItems?.map((g) => g.id) || []
        : [selectedItems?.id]

    return gallery.length
        ? gallery.slice().map((gal) => ({
              ...gal,
              selected: itemsHasId
                  ? ids.includes(gal.id)
                  : multiple
                  ? selectedItems.includes(gal)
                  : [selectedItems].includes(gal),
          }))
        : []
}

function hasId(items) {
    return items.some((item) => item.hasOwnProperty('id'))
}

// Determine the media item to be selected
function getSelectedSingleMedia(pre, newVal) {
    if (pre && pre.id === newVal.id) {
        newVal.selected = !newVal.selected

        return newVal.selected ? newVal : null
    } else {
        if (pre) pre.selected = false
        newVal.selected = true

        return newVal
    }
}

export default MediaSelect
