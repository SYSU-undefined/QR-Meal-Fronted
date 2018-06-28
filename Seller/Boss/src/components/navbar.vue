<template>
    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">餐厅管理系统</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/food">餐品管理</b-nav-item>
          <b-nav-item to="/table">餐桌管理</b-nav-item>
          <b-nav-item to="/staff">人员管理</b-nav-item>
          <b-nav-item to="/order">订单管理</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>
