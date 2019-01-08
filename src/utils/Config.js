/**
 *  功能：
 */

import {Dimensions} from 'react-native'


export const VERSION = '0.0.1'

export const DEBUG = __DEV__ // eslint-disable-line no-undef
// export const DEBUG = false // todo
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent

let {width, height} = Dimensions.get('window')
export const SCREEN_WIDTH = width
export const SCREEN_HEIGHT = height
export const STATUS_BAR_HEIGHT = 20
export const NAV_BAR_HEIGHT = 64
export const TAB_BAR_HEIGHT = 49


export const COLOR = {
    theme: '#006633',
    favored: '#C71A22',

    textLightNormal: '#FFFFFF',
    textLightPrompt: '#EBEBEB',
    textPrompt: '#929292',
    textNormal: '#5E5E5E',
    textEmphasis: '#212121',

    backgroundLighter: '#FFFFFF',
    backgroundNormal: '#EBEBEB',
    backgroundDarker: '#D6D6D6',
    backgroundDarkLighter: '#424242',
    backgroundDarkNormal: '#000000',

    background4Background: '#eee',


    backgroundNormalAlpha: '#EBEBEBDD',

    backgroundNotice: '#FFFB00',

    linePrompt: '#EBEBEB',
    lineNormal: '#A9A9A9',
    lineEmphasis: '#929292',

    primary: '#ff6347',
    secondary: '#3aa',
    dangerous: '#C71A22',
    blue: '#1E85FA',
    clear: '#00000000'
}
