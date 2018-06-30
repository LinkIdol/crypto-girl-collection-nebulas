<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <div class="content">
            <router-link class="navbar-item"
                         :to="{ name: 'Home'}">
              {{$t('Home')}}
            </router-link>
            <router-link class="navbar-item"
                         :to="{ name: 'FAQ'}">
              {{$t('FAQs')}}
            </router-link>
          </div>
        </div>
        <div class="column is-4">
          <div class="content">
            <router-link class="navbar-item"
                         :to="{ name: 'Term'}">
              {{$t('Terms of Service')}}
            </router-link>
            <router-link class="navbar-item"
                         :to="{ name: 'Privacy'}">
              {{$t('Privacy Policy')}}
            </router-link>
          </div>
        </div>
        <div class="column is-4">
          <div class="content">
            <span> {{$t('Contact Us')}}</span>
            <p>
            Telegram: @frankwei
            </p>
          </div>
        </div>
      </div>
      <div class="content has-text-centered">
        <p>
          <small>
            &copy; Copyright
            <strong>NAS.LinkIdol.pro</strong>
            2018
            <br>
            本网站需要 Chrome 搭配 WebExtensionWallet 插件才能正常使用
          </small>
        </p>
      </div>
    </div>
  </footer>
</template>
