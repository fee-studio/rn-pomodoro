/**
 *  功能：
 */

import {Dimensions} from 'react-native'


export const DEBUG = __DEV__ // eslint-disable-line no-undef
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent

export const VERSION = '0.0.1'

let {width, height} = Dimensions.get('window')
export const SCREEN_WIDTH = width
export const SCREEN_HEIGHT = height
export const STATUS_BAR_HEIGHT = 20
export const NAV_BAR_HEIGHT = 64
export const TAB_BAR_HEIGHT = 49


export const COLOR = {
    theme: '#006633',
    favored: '#C71A22',
    textPrompt: '#929292',
    textNormal: '#5E5E5E',
    textEmpha: '#212121',
    textLightPrompt: '#EBEBEB',
    textLightNormal: '#FFFFFF',
    backgroundDarker: '#D6D6D6',
    backgroundNormal: '#EBEBEB',
    backgroundLighter: '#FFFFFF',
    backgroundDarkLighter: '#424242',
    backgroundDarkNormal: '#000000',
    backgroundNotice: '#FFFB00',
    linePrompt: '#EBEBEB',
    lineNormal: '#A9A9A9',
    lineEmpha: '#929292',
    primary: '#ff6347',
    secondary: '#3aa',
}
