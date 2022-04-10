<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      hello: null,
    };
  },
  apollo: {
    blogs: gql`
      query {
        blogs {
          data {
            attributes {
              title
              body
            }
          }
        }
      }
    `,
  },
  components: {
    HelloWorld,
  },
};
</script>
