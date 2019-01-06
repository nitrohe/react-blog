import React,{Component} from 'react'
import style from './style.css'
import PureRenderMixin from 'react-addons-pure-render-mixin'


export default class RemarkMd extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    }

    render(){
        return(
            <div id='preview' className={style.content}>
                {this.props.articleParse}
            </div>
        )
    }

}
