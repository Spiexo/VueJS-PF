<script lang="ts">
export default {
  name: 'ContactView',
}
</script>

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
        errors.value.message = 'Votre message doit contenir au moins 20 caractères'
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

  const requestData = {
    ...form.value,
    date: new Date().toISOString(),
  }

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

  isSubmitted.value = true

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
        <h1>Contact Us</h1>

        <div class="form-group">
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

        <div class="form-group">
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

        <div class="form-group">
          <label for="subject">Sujet</label>
          <select id="subject" v-model="form.subject" @change="validateField('subject')">
            <option value="" disabled>Sélectionner un sujet</option>
            <option value="Bug">Bug</option>
            <option value="Question">Question</option>
            <option value="Autre">Autre</option>
          </select>
          <p v-if="errors.subject" class="error">{{ errors.subject }}</p>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            @input="validateField('message')"
            placeholder="Votre message"
          ></textarea>
          <p v-if="errors.message" class="error">{{ errors.message }}</p>
        </div>

        <button type="submit" class="submit-btn" :disabled="!isFormValid">
          Envoyer la demande
        </button>
      </form>
    </transition>
  </div>
</template>

<style scoped>
.container {
  max-width: 520px;
  margin: 0 auto;
  padding: 1rem 0;
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
  padding: 3rem;
  background: var(--lg-surface);
  backdrop-filter: blur(var(--lg-blur));
  -webkit-backdrop-filter: blur(var(--lg-blur));
  border-radius: var(--lg-radius);
  border: 1px solid var(--lg-border);
  box-shadow: var(--lg-inset-shadow), var(--lg-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.icon-circle {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.success-message h2 {
  color: var(--lg-success);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.success-message p {
  color: var(--lg-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.btn-primary {
  padding: 0.8rem 2rem;
  background: var(--lg-success-soft);
  color: var(--lg-success);
  border: 1px solid rgba(48, 209, 88, 0.2);
  border-radius: var(--lg-radius-pill);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.btn-primary:hover {
  background: rgba(48, 209, 88, 0.25);
  border-color: var(--lg-success);
  box-shadow: 0 0 20px rgba(48, 209, 88, 0.3);
}

/* FORM */
.form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--lg-surface);
  backdrop-filter: blur(var(--lg-blur));
  -webkit-backdrop-filter: blur(var(--lg-blur));
  border-radius: var(--lg-radius);
  border: 1px solid var(--lg-border);
  box-shadow: var(--lg-inset-shadow), var(--lg-shadow);
}

.form h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--lg-text-primary);
  text-align: center;
  margin-bottom: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--lg-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--lg-border);
  border-radius: var(--lg-radius-sm);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.04);
  color: var(--lg-text-primary);
  font-family: inherit;
}

input::placeholder,
textarea::placeholder {
  color: var(--lg-text-tertiary);
}

select option {
  background: #1a1a2e;
  color: var(--lg-text-primary);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--lg-accent);
  box-shadow: 0 0 16px var(--lg-accent-glow);
  background: rgba(255, 255, 255, 0.06);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.error {
  color: var(--lg-error);
  font-size: 0.8rem;
  margin: 0;
  font-weight: 500;
}

.submit-btn {
  margin-top: 0.5rem;
  padding: 0.9rem;
  background: var(--lg-accent-soft);
  color: var(--lg-accent);
  border: 1px solid rgba(100, 210, 255, 0.2);
  border-radius: var(--lg-radius-pill);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: rgba(100, 210, 255, 0.25);
  border-color: var(--lg-accent);
  box-shadow: 0 0 30px var(--lg-accent-glow);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: var(--lg-surface);
  color: var(--lg-text-tertiary);
  border-color: var(--lg-border);
}
</style>
