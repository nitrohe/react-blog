import React, {Component} from 'react'
import style from './style.css'

class Loadable  extends Component {
    constructor(props) {
        super(props);

    }

    
    render() {

        return (
            <div className={style.loadableLoading}><span className={style.LoadingLabel}>正在加载，请稍后……</span></div>
        )
    }

}

export default Loadable
