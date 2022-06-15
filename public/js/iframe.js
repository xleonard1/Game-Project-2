function getIframeContent(frameId) {
    var frameObj = 
        document.getElementById(frameId);

    var frameContent = frameObj.
        contentWindow.document.body.innerHTML;
        
    alert("frame content : " + frameContent)
}