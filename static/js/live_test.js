$(function() {
	$('#responseType').change(event => {
		$('#runLiveTest').prop("disabled", true)
	})

	$('#response').change(event => {
		$('#runLiveTest').prop("disabled", true)
	})

	$('#postData').change(event => {
		$('#runLiveTest').prop("disabled", true)
	})

	$('#runLiveTest').click(event => {
		event.preventDefault()


		try {
			var testUrl = event.currentTarget.dataset.testurl || null
			var responseType = $('#responseType').val()
			console.log('responseType:', responseType)

			var postData = $('#postData').val()
			var data = responseType == 0 ? postData || "" : JSON.parse(postData || '{}')

			console.log('data:', data)

			$.ajax({
				method: 'post',
				url: testUrl,
				dataType: responseType == 0 ? 'text' : 'json',
				data: data,
			}).done(response => {
				console.log(JSON.stringify(response, null, '\t'))
				$('#testResponse').text(JSON.stringify(response, null, 2))
			})
		} catch (error) {
			console.error(error)
			$('#testResponse').text(`POST Data Error: ${error.message}`)
		}
	})
})
