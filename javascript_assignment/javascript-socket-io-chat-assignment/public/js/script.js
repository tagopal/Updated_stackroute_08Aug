const MSG_USER_REGISTER_SUCCESS = 'User Successfully Registered !!!';
const MSG_MESSAGE_DELIVERED = 'Message Delivered !!!!!!';
const MSG_INVALID_CHANNEL_NAME = 'Invalid Channel name';
const MSG_MESSAGE_INVALID = 'Message is invalid';
const SUCCESS_MSG_TYPE = 'success';
const DANGER_MSG_TYPE = 'danger';

// To show message
function showMessage(type, message) {
    let content = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    		${message}
    		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    			<span aria-hidden="true">&times;</span>
    		</button>
    	</div>
    `;
    document.getElementById('alertContainer').innerHTML = content;
}

// Update Channels Dropdownlist
function updateChannelsDropdownList(channel) {
    let option = document.createElement('option');
    option.text = channel;
    option.value = channel;
    document.getElementById('channelsList').appendChild(option);
}

// To append content in the container
function appendChatMessage(content) {
    let container = document.getElementById('chatContainer');
    let newElement = document.createElement('div');
    newElement.className = 'col-12';
    newElement.innerHTML = content;
    container.insertBefore(newElement, container.firstChild);
}

function removeDropdownItem(channel) {
    let channelsList = document.getElementById('channelsList');
    let options = channelsList.getElementsByTagName('option');
    for (let index = 0; index < options.length; index = index + 1) {
        if (options[index].innerHTML === channel) {
            channelsList.removeChild(options[index]);
            break;
        }
    }
}

// check channel adready in the dropdown.
function checkChannelExists(channel) {
    let isExists = false;
    let channelsList = document.getElementById('channelsList');
    let options = channelsList.getElementsByTagName('option');
    for (let index = 0; index < options.length; index = index + 1) {
        if (options[index].innerHTML === channel) {
            isExists = true;
            break;
        }
    }
    return isExists;
}

/*
	Clear form elements
*/
function clearForm(message) {
	document.getElementById(message).value = '';
}

// Send Message
function sendMessage(event, socket) {
    event.preventDefault();
    let channel = document.getElementById('channel').value;
    if (channel === 'undefined' || channel.length === 0) {
        showMessage(DANGER_MSG_TYPE, MSG_INVALID_CHANNEL_NAME);
        return;
    }
    let message = document.getElementById('message').value;
    if (message === 'undefined' || message.length === 0) {
        showMessage(DANGER_MSG_TYPE, MSG_MESSAGE_INVALID);
        return;
    }
    socket.emit('message', {
        username: document.getElementById('username').value,
        channel: channel,
        message: message
    });
    let content = `
           	<div class="card sent-message">
				<div class="card-body">
					<p class="card-text"> Me : ${message}</p>
				</div>
			</div>
		`;
    appendChatMessage(content);
    showMessage(SUCCESS_MSG_TYPE, MSG_MESSAGE_DELIVERED);
    clearForm('message');
}

// Join Channel
function joinChannel(event, socket) {
    event.preventDefault();
    let joinChannels = document.getElementById('newchannel').value;
    if (joinChannels === 'undefined' || joinChannels.length === 0) {
        showMessage(DANGER_MSG_TYPE, MSG_INVALID_CHANNEL_NAME);
        return;
    }
    let channels = joinChannels === '' ? [] : joinChannels.split(',');
    document.getElementById('newchannel').value = '';
    channels.forEach((channel)=> {
        socket.emit('joinChannel', {
            channel: channel
        });
    });
}

// Leave Channel
function leaveChannel(event, socket) {
    event.preventDefault();
    let leaveChannels = document.getElementById('newchannel').value;
    if (leaveChannels === 'undefined' || leaveChannels.length === 0) {
        showMessage(DANGER_MSG_TYPE, MSG_INVALID_CHANNEL_NAME);
        return;
    }
    let channels = leaveChannels === '' ? [] : leaveChannels.split(',');
    document.getElementById('newchannel').value = '';
    channels.forEach((channel)=> {
        socket.emit('leaveChannel', {
            channel: channel
        });
    });
}

// Welcome Message after user register
function onWelcomeMessageReceived(message) {
    let content = `
            <div class="card received-message">
                <div class="card-body">
                    <p class="card-text"> System : ${message}</p>
                </div>
            </div>
        `;
    appendChatMessage(content);
    showMessage(SUCCESS_MSG_TYPE, MSG_USER_REGISTER_SUCCESS);
}

// New Message Received
function onNewMessageReceived(data) {
    if (data.username !== document.getElementById('username').value) {
        let content = `
            <div class="card received-message">
					<div class="card-body">
						<p class="card-text">${data.username} : ${data.message}</p>
					</div>
			</div>
        `;
        appendChatMessage(content);
    }
}

// New Channel Message received
function onAddedToNewChannelReceived(data) {
    if(!checkChannelExists(data.channel)) {
        updateChannelsDropdownList(data.channel);
    }
    document.getElementById('newchannel').value = '';
    showMessage(SUCCESS_MSG_TYPE,
        `You are added to <strong>${data.channel}</strong> successfully!`);
}

// Leaving channel received
function onRemovedFromChannelReceived(data) {
    removeDropdownItem(data.channel);
    document.getElementById('newchannel').value = '';
    showMessage(SUCCESS_MSG_TYPE,
        `You are removed from <strong>${data.channel}</strong> successfully!`);
}

module.exports = {
    sendMessage,
    joinChannel,
    leaveChannel,
    onWelcomeMessageReceived,
    onNewMessageReceived,
    onAddedToNewChannelReceived,
    onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
