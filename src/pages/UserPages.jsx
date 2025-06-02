import React from 'react';
import { Link } from 'react-router-dom';
import UserList from '../components/UserList'
import AddUser from '../components/AddUser'
import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader';

const UserPages = () => {
  return (
    <>
    <Header></Header>
    <AdminHeader></AdminHeader>
        <AddUser
          token={localStorage.getItem('access_token')}
        ></AddUser>
        <UserList
          token={localStorage.getItem('access_token')}
      />
       
    </>
  );
};

export default UserPages;