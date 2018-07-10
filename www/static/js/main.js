var client = mqtt.connect(); // you add a ws:// url here
client.subscribe("#");

currentTopics = new Map();

client.on("message", function (topic, payload) {
    let alertId = `${topic}`;
    if (currentTopics.has(topic)) {
        currentTopics.get(topic).children('.payload').html('' + payload);
    } else {
        $( "#data-content" ).append(
            `<div id='alertId' class='alert alert-dark row btn-outline-dark'>
                <div class='row mr-auto'>${topic}</div>
                <div class="row payload">${payload}</div>
            </div>`);
        currentTopics.set(topic, $( "#alertId" ));
    }
});


$('#add-action-btn').click(() => {
    $( "#action-content" ).append(
        `<form class="form-inline py-2 my-2 my-lg-0">
            <input class="topic-on-send form-control mr-sm-2" type="search" placeholder="Topic" aria-label="Topic">
            <input class="data-on-send form-control mr-sm-2" type="search" placeholder="Payload" aria-label="Payload">
            <button class="send-btn btn btn-outline-success my-2 my-sm-0">Send</button>
        </form>` );
});

$('#action-content').on('click', '.send-btn', function(event) {
    event.preventDefault();
    let topic = $(this).siblings('.topic-on-send').val();
    let payload = $(this).siblings('.data-on-send').val();
    client.publish(topic, payload);
});
