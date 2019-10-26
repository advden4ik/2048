import {uniqueId} from 'lodash'

export const create = (x, y, value) => ({x, y, value, id: uniqueId()})
