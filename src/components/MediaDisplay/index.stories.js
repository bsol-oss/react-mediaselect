import React, { useState } from 'react'
import {
    ChakraProvider,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'
import {
    SiMicrosoftexcel,
    SiMicrosoftword,
    SiMicrosoftpowerpoint,
} from 'react-icons/si'
import {
    AiOutlineFileZip,
    AiOutlineFilePdf,
    AiOutlineFile,
} from 'react-icons/ai'

import MediaDisplay from './index'
import { extendedTheme, gallery } from './sample'
import {
    ImageItemContainer,
    VideoThumbnailContainer,
    VideoThumbnail,
    ApplicationIcons,
    ImageItem,
} from './styles'
import GlobalStyles from '../../const/globalStyles'

const CustomSearchInput = ({ globalFilter, setGlobalFilter }) => (
    <div style={{ maxWidth: '250px', padding: '1rem 0', width: '100%' }}>
        <InputGroup>
            <Input
                size={'sm'}
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search custom media"
            />
            <InputRightElement
                width={8}
                height={8}
                children={<MdSearch size={24} color={'#ccc'} />}
            />
        </InputGroup>
    </div>
)

const CustomFilters = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => (
    <CustomSearchInput
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
    />
)

const MediaItem = ({ item, popup, actions }) => {
    let { type = 'picture' } = item.original
    type = type.toLowerCase()

    if (type.substring(0, 3) === 'doc') {
        let appIcon = <AiOutlineFile id="fileIcon" color="#000" />

        if (type.includes('word')) {
            appIcon = <SiMicrosoftword id="wordIcon" color="#0000FF" />
        } else if (type.includes('ms-powerpoint')) {
            appIcon = <SiMicrosoftpowerpoint id="pptIcon" color="#FFA500" />
        } else if (type.includes('ms-excel')) {
            appIcon = <SiMicrosoftexcel id="excIcon" color="#008000" />
        } else if (type.includes('pdf')) {
            appIcon = <AiOutlineFilePdf id="pdfIcon" color="#FF0000" />
        } else if (type.includes('zip')) {
            appIcon = <AiOutlineFileZip id="zipIcon" color="#808080" />
        }

        return <ApplicationIcons onClick={popup}>{appIcon}</ApplicationIcons>
    }

    return (
        <>
            {type === 'video' ? (
                <VideoThumbnailContainer
                    className="spotlight"
                    data-media="video"
                    data-src-webm={item.original.src}
                    data-src-ogg={item.original.src}
                    data-src-mp4={item.original.src}
                    data-poster="https://img.icons8.com/material-outlined/48/000000/video.png"
                    data-autoplay="true"
                    data-muted="true"
                    data-preload="true"
                    data-controls="true"
                    data-inline="false"
                >
                    <div className="overlay">
                        <div>
                            <button>Use this</button>
                        </div>
                        <div>
                            <button>Show full screen</button>
                        </div>
                    </div>
                    <VideoThumbnail src={item.original.thumbnail} />
                </VideoThumbnailContainer>
            ) : (
                <ImageItemContainer onClick={actions.onSelect || popup}>
                    <div className="overlay">
                        <div>
                            <button>Use this</button>
                        </div>
                        <div>
                            <button onClick={popup}>Show full screen</button>
                        </div>
                    </div>
                    <ImageItem
                        src={item.original.thumbnail}
                        alt={item.original.title}
                    />
                </ImageItemContainer>
            )}
        </>
    )
}

export const DefaultMediaDisplay = () => {
    const [data, setData] = useState(gallery)

    return (
        <ChakraProvider theme={extendedTheme}>
            <>
                <GlobalStyles />
                <div>
                    <select
                        onChange={(e) => {
                            const newData = gallery.filter((item) =>
                                e.currentTarget.value
                                    ? item.type === e.currentTarget.value
                                    : true
                            )
                            setData(newData)
                        }}
                    >
                        <option value="">All</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="doc">Doc</option>
                    </select>
                </div>
                <MediaDisplay data={data} popupOptions={{ download: true }} />
            </>
        </ChakraProvider>
    )
}

export const WithCustomMediaItemDimensions = () => (
    <ChakraProvider theme={extendedTheme}>
        <>
            <GlobalStyles />
            <MediaDisplay data={gallery} width={350} height={180} />
        </>
    </ChakraProvider>
)

export const WithCustomContainerHeight = () => (
    <ChakraProvider theme={extendedTheme}>
        <>
            <GlobalStyles />
            <MediaDisplay data={gallery} containerHeight={100} />
        </>
    </ChakraProvider>
)

export const WithCustomMediaItem = () => (
    <ChakraProvider theme={extendedTheme}>
        <>
            <GlobalStyles />
            <MediaDisplay
                data={gallery}
                components={{ MediaItem }}
                actions={{
                    onSelect: () => {
                        console.log('"actions.onSelect()" clicked')
                    },
                }}
            />
        </>
    </ChakraProvider>
)

export const WithCustomFiltersCustomMediaItem = () => (
    <ChakraProvider theme={extendedTheme}>
        <>
            <GlobalStyles />
            <MediaDisplay
                data={gallery}
                components={{ Filters: CustomFilters, MediaItem }}
            />
        </>
    </ChakraProvider>
)

export const WithSingleSelectable = () => (
    <ChakraProvider theme={extendedTheme}>
        <>
            <GlobalStyles />
            <MediaDisplay
                data={gallery}
                components={{ MediaItem }}
                selectable={'single'}
                onSelect={(value) => console.log(value, '@selected-item')}
            />
        </>
    </ChakraProvider>
)

export const WithMultiSelectable = () => (
    <ChakraProvider theme={extendedTheme}>
        <>
            <GlobalStyles />
            <MediaDisplay
                data={gallery}
                components={{ MediaItem }}
                selectable={'multi'}
                onSelect={(value) => console.log(value, '@selected-items')}
            />
        </>
    </ChakraProvider>
)

export default { title: 'Media Display', component: MediaDisplay }
