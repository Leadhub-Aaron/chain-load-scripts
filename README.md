Usage
=====

Just give your `<script>` elements a data-src attribute like so:

	<script data-src='/path/to/my/script.js'></script>

The script loader will run through all such elements and run them
asynchronously and in order, firing a `scriptsLoaded` event on the 
`document` element at the end of it all.
