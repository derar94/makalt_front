<template>
  <v-main fill-height fluid>
    <v-row align="center" justify="center" bg-white>
      <v-col xl="4" lg="5" md="6" sm="8" xs="8">
        <v-alert
          v-model="showRequiredAlert"
          border="right"
          dismissible
          rounded
          type="warning"
          transition="slide-x-transition"
        >
          الرجاء التأكد من البريد الألكتروني وكلمة المرور
        </v-alert>
        <v-alert
          v-model="wrongCredintals"
          border="right"
          dismissible
          rounded
          type="error"
          transition="slide-x-transition"
        >
          البريد الإلكتروني أو كلمة المرور غير صحيحين
        </v-alert>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="البريد الإلكتروني"
            required
            filled
            rounded
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="كلمة المرور"
            required
            filled
            type="password"
            rounded
          ></v-text-field>

          <v-btn
            color="primary"
            @click="validate"
            rounded
            block
            large
            :disbled="loading"
            :loading="loading"
          >
            تسجيل الدخول
            <v-icon>
              mdi-login
            </v-icon>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      loading: "auth/loading",
      wrongCredintals: "auth/wrongCredintals",
    }),
  },
  data: () => ({
    showRequiredAlert: false,
    valid: false,
    password: "",
    passwordRules: [
      (v) => !!v || "كلمة المرور يجب أن تحتوي على 4 حروف على الأقل",
      (v) =>
        (v && v.length >= 4) || "كلمة المرور يجب أن تحتوي على 4 حروف على الأقل",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "البريد الإلكتروني مطلوب",
      (v) => /.+@.+\..+/.test(v) || "البريد الإلكتروني غير صالح",
    ],
  }),
  methods: {
    async validate() {
      if (this.$refs.form.value) {
        await this.signIn({ email: this.email, password: this.password });
      } else {
        this.showRequiredAlert = true;
      }
    },

    ...mapActions({
      signIn: "auth/signIn",
    }),
  },
};
</script>
