import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '@reducers/tagsReducer'
import style from './style.css'
import {Tag, Input, Tooltip, Button} from 'antd'

const {get_all_tags,delete_tag,add_tag} = actions;

class ManageTags extends Component{
    constructor(props){
        super(props);
        this.state={
            tags: ['首页', 'HTML', 'CSS','JAVASCRIPT'],
            inputVisible: false,
            inputValue: '',
        }
    }
    handleClose = (removedTag) => {
        //删除标签
        this.props.deleteTag(removedTag)
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        // 添加标签
        this.props.addTag(this.state.inputValue);
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => this.input = input;
    render(){
        const { inputVisible, inputValue } = this.state;
        const {tags} = this.props;
        return(
            <div>
                <span className={style.titleStyle}>标签管理</span>


            </div>
        )
    }

    componentDidMount() {
        this.props.getAllTags();
    }
}

function mapStateToProps(state) {
    return{
        tags:state.admin.tags
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getAllTags : bindActionCreators(get_all_tags,dispatch),
        deleteTag : bindActionCreators(delete_tag,dispatch),
        addTag : bindActionCreators(add_tag,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTags)
