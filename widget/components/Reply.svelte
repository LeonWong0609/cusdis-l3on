<script>
  import { getContext } from 'svelte'
  import { t } from '../i18n'
  export let parentId

  // form data
  let content = ''
  let nickname = ''
  let email = ''

  let loading = false

  export let onSuccess

  const api = getContext('api')
  const setMessage = getContext('setMessage')
  const { appId, pageId, pageUrl, pageTitle } = getContext('attrs')
  const refresh = getContext('refresh')

  async function addComment() {
    if (!content) {
      alert(t('content_is_required'))
      return
    }

    if (!nickname) {
      alert(t('nickname_is_required'))
      return
    }

    try {
      loading = true
      const res = await api.post('/api/open/comments', {
        appId,
        pageId,
        content,
        nickname,
        email,
        parentId,
        pageUrl,
        pageTitle,
      })
      await refresh()
      teardown()
      setMessage(t('comment_has_been_sent'))
    } finally {
      loading = false
    }
  }

  function teardown() {
    content = ''
    nickname = ''
    email = ''
    onSuccess && onSuccess()
  }

</script>

<div class="grid grid-cols-1 gap-4">
  <div class="grid grid-cols-2 gap-4">
    <div class="px-1">
      <label class="mb-2 block dark:text-gray-200" for="nickname">{t('nickname')}</label>
      <input
        name="nickname"
        class="rounded w-full p-2 bg-transparent text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
        type="text"
        title={t('nickname')}
        bind:value={nickname}
      />
    </div>
    <div class="px-1">
      <label class="mb-2 block dark:text-gray-200" for="email">{t('email')}</label>
      <input
        name="email"
        class="rounded w-full p-2 bg-transparent text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
        type="email"
        title={t('email')}
        bind:value={email}
      />
    </div>
  </div>

  <div class="px-1">
    <label class="mb-2 block dark:text-gray-200" for="reply_content">{t('reply_placeholder')}</label>
    <textarea
      name="reply_content"
      class="rounded w-full p-2 bg-transparent text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500 h-24"
      title={t('reply_placeholder')}
      bind:value={content}
    />
  </div>

  <div class="px-1 flex items-center justify-between">
    <button

      class="rounded text-sm text-gray-700 font-bold p-2 px-4 bg-gray-200 dark:text-gray-200 dark:bg-gray-500"
      class:cusdis-disabled={loading}
      on:click={addComment}>{loading ? t('sending') : t('post_comment')}</button
    >
    <div class="text-gray-500 dark:text-gray-400 text-xs hover:text-red-500 dark:hover:text-red-300">
      <a class="underline " href="https://cusdis.com">{t('powered_by')}</a>
    </div>
  </div>
</div>

<style>
  /* textarea,
  input {
    width: 100%;
    border: 2px solid;
    color: var(--cusdis--color-text-default);
    border-color: var(--cusdis--color-input-border);
    background: none;
    padding: 0.5em;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
    box-sizing: border-box;
    font-size: 1em;
  }

  textarea {
    height: 5em;
    outline: none;
  }

  .cusdis-disabled {
    background-color: var(--cusdis--color-btn-bg-disabled);
    cursor: not-allowed;
  }

  .cusdis-reply-info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 0.5em;
  }

  @media only screen and (max-width: 767px) {
    .cusdis-reply-info {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-row-gap: 0.5em;
    }
  }

  .submit-btn {
    background-color: var(--cusdis--color-btn-bg-default);
    color: var(--cusdis--color-btn-text);
    border-radius: 0;
    border: var(--cusdis--color-btn-border);
    padding: 0.5em 1em;
    cursor: pointer;
    border-radius: 2px;
    font-family: inherit;
    font-size: 1em;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    font: inherit;
    font-weight: bold;
    align-items: center;
  }

  .cusdis-field {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  } */

</style>
