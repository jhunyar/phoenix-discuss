import {Socket} from "phoenix"

let socket = new Socket("/socket", { params: {token: window.userToken} })

socket.connect()

let channel = socket.channel(`comments:${window.topicId}`, {})
channel
  .join()
  .receive("ok", resp => {
    renderComments(resp.comments)
  })
  .receive("error", resp => {
    console.log("Unable to join", resp)
  })

channel.on(`comments:${topicId}:new`, renderComment)

function renderComments(comments) {
  const renderedComments = comments.map(comment => {
    return commentTemplate(comment)
  })

  document.querySelector('.collection').innerHTML = renderedComments.join('')
}

document.querySelector('button').addEventListener('click', () => {
  const content = document.querySelector('textarea').value

  channel.push('commend:add', { content: content })
})

function renderComment(event) {
  const renderedComment = commentTemplate(event.comment)

  document.querySelector('.collection').innerHTML += renderedComment
}

function commentTemplate(comment) {
  let email = 'Anonymous'
  if (comment.user) {
    email = comment.user.email
  }

  return `
    <li class="collection-item">
      ${comment.content}
      <div class="secondary-content">
        ${email}
      </div>
    </li>
  `
}