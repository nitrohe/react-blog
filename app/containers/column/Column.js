import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import {Icon} from 'antd';
import DocumentTitle from 'react-document-title';

export default class Column extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        //this.state = {
        //    current:this.props.categories[0]
        //}
        this.columnItem = ['CSDN','掘金','IMWeb','WEB前端','WEB骇客','PHP'];
    }

    render(){
        let _this = this;

        let liList = this.columnItem.map((item,index)=>(
            <li key={index} className={style.navItem}>
                <a href="javascript:;" target="_self">{item}</a>
            </li>
        ));
        let webTitle = "Nitrohe's Blog";

        return(
            <DocumentTitle title={`${webTitle} | 专栏`}>
                <div className={style.columnLayoutMain}>

                    <div className={`${style.newsdataNavFixed} ${style.newsdataNav}`}>
                        <ul >
                            {liList}
                        </ul>

                    </div>

                </div>
            </DocumentTitle>


        )
    }



}
