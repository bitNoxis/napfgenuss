<script>
  import { onMount } from 'svelte';

  // We'll receive a formId prop from Astro
  export let formId;

  // The actual onSubmit logic
  async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  console.log("Form data submitted:", data);

  try {
    console.log('Try log')
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    console.log("Redirecting to /users/users");
    window.location.replace('/users/users');
  } catch (error) {
    console.error("Error during form submission:", error);
    alert('Oops. Wir konnten den Nutzer nicht anlegen.');
  }
}

  // Attach the submit listener once the component mounts
  onMount(() => {
    const formEl = document.getElementById(formId);
    if (!formEl) {
      console.error(`Form element with ID="${formId}" not found`);
      return;
    }
    formEl.addEventListener('submit', handleSubmit);
  });
</script>

