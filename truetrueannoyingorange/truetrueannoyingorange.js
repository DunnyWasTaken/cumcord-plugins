import { findByProps, findAll } from "@cumcord/modules/webpack"
const { getChannelId } = findByProps("getChannelId", "getVoiceChannelId");
const messageQueue = findAll(arg => arg.enqueue)[0]

function enqueueMessage(text) {
    return messageQueue.enqueue(
        {
            "type": 0,
            "message": {
                channelId: getChannelId(),
                content: text
            }
        },
        r => {
            return;
        }
    )
}

// Ideally we would want to be able to remap the keys but i'm just here to make this functional and not shit
function keyHandler(event) {
    if(event.altKey == true && event.keyCode == 70) { // ALT + F - Dog
        event.preventDefault();
        return enqueueMessage("https://tenor.com/view/true-truth-orange-weird-true-that-gif-14308761");
    }

    return event;
}

export default (data) => {
    return {
        onLoad() {
            document.addEventListener("keydown", keyHandler)
        },
        onUnload() {
            document.removeEventListener("keydown", keyHandler)
        }
    }
}
