<script setup lang="ts">
import { onMounted } from 'vue';
import router from '@/router';
import AuthService from '@/services/AuthService';

onMounted(async () => {
  const user = await AuthService.getUser();

  console.log('user: ', user);
  if (user) router.push({ path: 'home' });
})

const onLoginClick = () => {
  AuthService.login();
}
</script>

<template>
  <div>
    <p className="steps-title">Follow these simple steps to get started:</p>
    <div className="section">
      <label>Step 1:</label>
      <p>Head over to <a href="https://developer.softrig.com" target="_blank"
          rel="noreferrer">https://developer.softrig.com</a> and create an application with a SPA client</p>
    </div>
    <div className="section">
      <label>Step 2:</label>
      <p>
        Create a copy of the <span class="bold">.env.example</span> file,
        rename it to <span class="bold">.env</span> and fill in the values
      </p>
      <div className="code-block">
        <code>
          {{ `VITE_IDENTITY_SERVER_BASE_URL="<VALUE>"` }}
          <br />{{ `VITE_CLIENT_ID="<VALUE>"` }}
          <br />{{ `VITE_IDENTITY_SERVER_SCOPES="<VALUE>"` }}
          <br />{{ `VITE_REDIRECT_URL="<VALUE>"` }}
          <br />{{ `VITE_POST_LOGOUT_REDIRECT_URL="<VALUE>"` }}
          <br />{{ `VITE_SILENT_REDIRECT_UR="<VALUE>"` }}
          <br />{{ `VITE_API_BASE_URL="<VALUE>"` }}
        </code>
      </div>
    </div>
    <div className="section">
      <label>Step 3:</label>
      <p>Click the log in button below after completing the steps above :)</p>
      <button @click="onLoginClick">Log in</button>
    </div>
    <img src="/images/artwork.png" className="artwork" alt="logo" />
  </div>
</template>


<style scoped>
.artwork {
  position: absolute;
  width: 400px;
  bottom: 30px;
  right: 15%;
}

.steps-title {
  margin-bottom: 1.5rem;
}

@media (max-width: 1200px) {
  .artwork {
    display: none;
  }
}
</style>