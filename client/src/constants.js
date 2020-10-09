import * as axios from "axios";

export const getDataWithPagination = (url, pageNumber = PAGINATION_INITIAL_PAGE, pagination = PAGINATION_PER_PAGE) => {
    return axios.get(url, {params: {pageNumber, pagination}})
}

export const defaultSliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
};

export const ADMIN = 'Admin'

export const WS_URL = 'ws://localhost:3030'

export const ALIVE = 'Alive'
export const DEAD = 'Dead'
export const UNKNOWN = 'unknown'

export const PAGINATION_PER_PAGE = 20
export const PAGINATION_INITIAL_PAGE = 1