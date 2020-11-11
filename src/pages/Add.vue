<template>
  <v-main>
    <v-overlay :value="overlay" opacity="0.9">
      <v-row justify="center" class="flex-column">
        <v-autocomplete
          chips
          clearable
          filled
          multiple
          rounded
          :items="['css', 'python', 'javascript']"
        ></v-autocomplete>
        <v-btn class="primary">
          <v-icon left> mdi-save </v-icon>
          حفظ
        </v-btn>
      </v-row>
    </v-overlay>
    <v-row>
      <v-col xl="2" lg="2">
        <v-flex class="d-flex flex-column">
          <v-btn-toggle class="flex-column" active-class="success">
            <v-btn @click="addComponent('h')">
              <v-icon left> mdi-format-header-1 </v-icon>
              عنوان
            </v-btn>
            <v-btn @click="addComponent('p')">
              <v-icon left> mdi-format-paragraph </v-icon>
              فقرة
            </v-btn>
            <v-btn @click="addComponent('d')">
              <v-icon left> mdi-dots-horizontal </v-icon>
              فاصل
            </v-btn>
            <v-btn @click="overlay = true">
              <v-icon left> mdi-code-array </v-icon>
              كود برمجي
            </v-btn>
            <v-btn @click="addComponent('i')">
              <v-icon left> mdi-camera </v-icon>
              صورة
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-col>
      <!-- Input -->
      <v-col xl="5" lg="5">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            label="عنوان المقالة"
            required
            filled
            rounded
          >
          </v-text-field>
          <div v-for="(component, index) in mainObj" :key="index">
            <v-text-field
              label="عنوان"
              required
              filled
              rounded
              v-if="component.type == 'h'"
              append-icon="mdi-delete"
              prepend-icon="mdi-format-header-1"
              @click:append="deleteComponent(index)"
              @input="changeBody(index)"
            >
            </v-text-field>
            <v-textarea
              v-if="component.type == 'p'"
              label="فقرة"
              rounded
              filled
              append-icon="mdi-delete"
              prepend-icon="mdi-format-paragraph"
              @click:append="deleteComponent(index)"
              @input="changeBody(index)"
            ></v-textarea>
            <v-textarea
              dir="ltr"
              v-if="component.type == 'c'"
              solo
              label="كود برمجي"
              rounded
              @click:append="deleteComponent(index)"
              @input="changeBody(index)"
              append-icon="mdi-delete"
              prepend-icon="mdi-code-array"
              style="text-align: left"
            ></v-textarea>
            <v-file-input
              append-icon="mdi-delete"
              @click:append="deleteComponent(index)"
              v-if="component.type == 'i'"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="صورة"
              prepend-icon="mdi-camera"
              label="صورة"
              rounded
              solo
              @change="uploadPhoto(index)"
              show-size
              :rules="imageRules"
            ></v-file-input>
            <div v-if="component.type == 'd'" class="my-8"></div>
          </div>
          <!-- 
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn> -->
        </v-form>
      </v-col>
      <!-- Output -->
      <v-col xl="5" lg="5">
        <h2 class="mb-4">{{ title }}</h2>
        <div v-for="(component, index) in mainObj" :key="index">
          <h3 class="mb-4" v-if="component.type == 'h'">
            {{ component.body }}
          </h3>
          <p class="mb-4" v-if="component.type == 'p'">{{ component.body }}</p>
          <pre
            dir="ltr"
            v-if="component.type == 'c'"
            v-highlightjs="component.body"
          ><code class="javascript"></code></pre>
          <div v-if="component.type == 'd'" class="my-8"></div>
          <v-img v-if="component.type == 'i'" :src="component.body"></v-img>
        </div>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
    mainObj: [],
    valid: true,
    title: "",
    imageRules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "حجم الصورة يجب أن لا يتجاوز ال 2 ميغا",
    ],
    titleRules: [
      (v) => !!v || "العنوان مطلوب",
      (v) =>
        (v && v.length >= 10) || "يجب أن يحتوي العنوان على 10 أحرف على الأقل",
    ],
  }),

  methods: {
    addComponent(type) {
      // add new object to the array of content
      this.mainObj.push({
        type: type,
        body: "",
      });
      //   add input to view
    },
    deleteComponent(index) {
      this.mainObj.splice(index, 1);
    },
    changeBody(index) {
      this.mainObj[index]["body"] = event.target.value;
    },
    validate() {
      this.$refs.form.validate();
    },
    uploadPhoto(index) {
      const image = event.target.files[0];
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("image", image);
      window.axios
        .post("/api/upload-image", formData, config)
        .then((response) => {
          this.mainObj[index]["body"] = response.data.image;
          //   currentObj.success = response.data.success;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
