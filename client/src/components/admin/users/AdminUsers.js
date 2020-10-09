import React, {useState} from "react";
import css from './AdminUsers.module.css'
import FA from "react-fontawesome";
import Pagination from "react-js-pagination";

const AdminUsers = (props) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        props.getAllUsers(pageNumber)
    }

    const editRole = (role, id) => {
        props.appointment(id.id, role)
    }

    const onUserLock = (id) => {
        props.userLock(id)
    }

    const roles = ['Admin', 'User']
    return (
        <div className={'row'}>
            <div className={'col-2'}/>
            <div className={'col-10'}>
                <table className="table table-hover table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.users.results && props.users.results.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.rating}</td>
                            <td>
                                <select onChange={(event) => editRole(event.target.value, {id: user._id})
                                } className={css.select}>
                                    {roles.map((role,index) => role === user.role
                                        ? <option key={index} selected>{role}</option>
                                        : <option key={index}>{role}</option>)}
                                </select>
                            </td>
                            <td>
                                {props.currentUser.userId === user._id ? <></> :
                                    user.is_active ?
                                        <button className={'btn btn-success text-center'}
                                                onClick={() => onUserLock(user._id)}>
                                            <FA
                                                className="d-flex align-self-center fas fa-lock-open"
                                                name="unlock"
                                            />
                                        </button>
                                        : <button className={'btn btn-danger text-center'}
                                                  onClick={() => onUserLock(user._id)}>
                                            <FA
                                                className="d-flex align-self-center fas fa-ban"
                                                name="ban"
                                            />
                                        </button>
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className={'row justify-content-center'}>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={20}
                        totalItemsCount={props.users.info && props.users.info.count}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange.bind(this)}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminUsers
