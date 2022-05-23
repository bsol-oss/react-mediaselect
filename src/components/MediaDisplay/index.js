import React from 'react'
import { merge } from 'lodash'
import Spotlight from 'spotlight.js/src/js/spotlight.js'
import { MdSearch } from 'react-icons/md'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
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
import DataTable from '@bsol-oss/react-datatable'

import {
    VideoThumbnailContainer,
    VideoThumbnail,
    ImageItemContainer,
    ApplicationIcons,
    ImageItem,
} from './styles'

const SearchInput = ({ globalFilter, setGlobalFilter }) => (
    <div style={{ maxWidth: '250px', padding: '1rem 0', width: '100%' }}>
        <InputGroup>
            <Input
                size={'sm'}
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search media"
            />
            <InputRightElement
                width={8}
                height={8}
                children={<MdSearch size={24} color={'#ccc'} />}
            />
        </InputGroup>
    </div>
)

const DefaultFilters = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => (
    <SearchInput
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
    />
)

const DefaultMediaItemContainer = ({ item, popup }) => {
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
                    <VideoThumbnail src={item.original.thumbnail} />
                </VideoThumbnailContainer>
            ) : (
                <ImageItemContainer onClick={popup}>
                    <ImageItem
                        src={item.original.thumbnail}
                        alt={item.original.title}
                    />
                </ImageItemContainer>
            )}
        </>
    )
}

const MediaDisplay = ({
    data = [],
    options = {},
    popupOptions = {},
    components = {},
    selectable = '',
    onSelect,
    actions = {},
    width = 200,
    height = 200,
    containerHeight,
}) => {
    const { Filters = DefaultFilters, MediaItem = DefaultMediaItemContainer } =
        components

    const columns = [
        {
            Header: 'Thumbnail',
            accessor: 'thumbnail',
            defaultCanFilter: true,
            height: 60,
            Cell: () => <></>,
            CellForGrid: ({ row, rows }) => (
                <MediaItem
                    data={data}
                    item={row}
                    width={width}
                    height={height}
                    popup={() => {
                        const items = rows.map((r) => r.original)
                        const index = items.indexOf(row.original)

                        Spotlight.show(
                            items,
                            merge(
                                {
                                    autohide: false,
                                    class: 'media-display',
                                },
                                popupOptions,
                                { index: index + 1 }
                            )
                        )
                    }}
                    onSelect={onSelect}
                    actions={actions}
                />
            ),
        },
        {
            Header: 'Title',
            accessor: 'title',
            defaultCanFilter: true,
            Cell: () => <></>,
            CellForGrid: () => <></>,
        },
        {
            Header: 'Description',
            accessor: 'description',
            defaultCanFilter: true,
            Cell: () => <></>,
            CellForGrid: () => <></>,
        },
        {
            Header: 'fileName',
            accessor: 'fileName',
            defaultCanFilter: true,
            Cell: () => <></>,
            CellForGrid: () => <></>,
        },
    ]

    return (
        <DataTable
            loading={false}
            columns={columns}
            data={data}
            selectable={selectable}
            onSelect={onSelect}
            showToggleButtons={false}
            showTotalRecords={false}
            showGlobalSearch={true}
            showTableHeader={false}
            view="GRID"
            height={containerHeight || 220}
            cellMaxWidth={width}
            cellHeight={height}
            enabledView={['GRID']}
            wrapper={{ ActionsWrapper: Filters }}
            {...options}
        />
    )
}

export default MediaDisplay
