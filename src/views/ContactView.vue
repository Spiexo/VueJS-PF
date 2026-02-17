<script setup lang="ts">
import { ref, computed } from 'vue'

// STATE
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// ERREURS
const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// VALIDATION LOGIC
const validateField = (field: string) => {
  switch (field) {
    case 'name':
      if (form.value.name.length < 2) {
        errors.value.name = 'Le nom doit contenir au moins 2 caractères'
      } else {
        errors.value.name = ''
      }
      break

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.value.email)) {
        errors.value.email = 'Email invalide'
      } else {
        errors.value.email = ''
      }
      break

    case 'subject':
      if (!['Bug', 'Question', 'Autre'].includes(form.value.subject)) {
        errors.value.subject = 'Veuillez sélectionner un sujet valide'
      } else {
        errors.value.subject = ''
      }
      break

    case 'message':
      if (form.value.message.length < 20) {
        errors.value.message = 'Votre message'
      } else {
        errors.value.message = ''
      }
      break
  }
}

// VALIDATION GLOBALE quand on confirme l'envoie
const isFormValid = computed(() => {
  const isNameValid = form.value.name.length >= 2
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
  const isSubjectValid = ['Bug', 'Question', 'Autre'].includes(form.value.subject)
  const isMessageValid = form.value.message.length >= 20

  return isNameValid && isEmailValid && isSubjectValid && isMessageValid
})

// SUCCESS STATE
const isSubmitted = ref(false)

// SUBMIT
const submitForm = () => {
  if (!isFormValid.value) return

  // 1. Préparer les données
  const requestData = {
    ...form.value,
    date: new Date().toISOString(),
  }

  // 2. Simuler l'écriture dans un fichier JSON (Téléchargement)
  const jsonString = JSON.stringify(requestData, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `demande_contact_${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  // 3. Afficher le succès
  isSubmitted.value = true

  // 4. Reset du formulaire (optionnel si on cache le formulaire)
  form.value = { name: '', email: '', subject: '', message: '' }
  errors.value = { name: '', email: '', subject: '', message: '' }
}

const resetForm = () => {
  isSubmitted.value = false
}
</script>

<template>
  <div class="container">
    <transition name="fade" mode="out-in">
      <div v-if="isSubmitted" class="success-message">
        <div class="icon-circle">✅</div>
        <h2>Message Envoyé !</h2>
        <p>
          Merci de nous avoir contactés. Nous avons bien reçu votre demande et le fichier a été
          téléchargé.
        </p>
        <button @click="resetForm" class="btn-primary">Envoyer un autre message</button>
      </div>

      <form v-else @submit.prevent="submitForm" class="form">
        <div>
          <label for="name">Nom</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            @input="validateField('name')"
            placeholder="Votre nom"
          />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>

        <div>
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            @input="validateField('email')"
            placeholder="exemple@email.com"
          />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>

        <div>
          <label for="subject">Sujet</label>
          <select id="subject" v-model="form.subject" @change="validateField('subject')">
            <option value="" disabled>Sélectionner un sujet</option>
            <option value="Bug">Bug</option>
            <option value="Question">Question</option>
            <option value="Autre">Autre</option>
          </select>
          <p v-if="errors.subject" class="error">{{ errors.subject }}</p>
        </div>

        <div>
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            @input="validateField('message')"
            placeholder="Votre message"
          ></textarea>
          <p v-if="errors.message" class="error">{{ errors.message }}</p>
        </div>

        <button type="submit" :disabled="!isFormValid">Envoyer la demande</button>
      </form>
    </transition>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
}

/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* SUCCESS MESSAGE */
.success-message {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.icon-circle {
  font-size: 48px;
  margin-bottom: 8px;
}

.success-message h2 {
  color: #2e7d32;
  margin: 0;
}

.success-message p {
  color: #666;
  margin-bottom: 24px;
}

.btn-primary {
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #43a047;
}

.form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
  background: white;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.error {
  color: #e53935;
  font-size: 12px;
  margin: 0;
  font-weight: 500;
}

button {
  margin-top: 10px;
  padding: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover:not(:disabled) {
  background-color: #43a047;
  transform: translateY(-1px);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
