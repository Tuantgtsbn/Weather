/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import styles from "./Results.module.scss";
const cx = classNames.bind(styles);
function Results({datas=[]}) {
    if(datas.length === 0) {
        return false;

    }else{
        const first = datas[0];
        const arrFields = Object.keys(first);
        return (
            
                <div className={cx('wrapper-table')} >
                    <table className='table table-striped' style={{position: "relative"}}>
                        <thead className="table table-primary" style={{position: "sticky", zIndex: 1, top: 0}}>
                            <tr >
                                <th >#</th>
                                <th >Thời gian bắt đầu</th>
                                <th >Thời gian kết thúc</th>
                                <th >Kéo dài</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datas.map((data, index) => (
                                    <tr  key={index}>
                                        <td >{index + 1}</td>
                                        {   
                                            arrFields.map((field, index) => (
                                                <td  key={index}>{data[field]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            
        )
    }


}

export default Results;