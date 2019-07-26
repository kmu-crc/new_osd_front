import { TopDesignList } from "reducers/Designs/TopDesignList"
import { DesignList } from "reducers/Designs/DesignList"
import { Category } from "reducers/Category/Category"
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({ Category, DesignList, TopDesignList, form: formReducer, })