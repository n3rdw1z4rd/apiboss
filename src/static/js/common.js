$(function(){
	$('.modal').on('shown.bs.modal', function() {
		$(this).find('[autofocus]').focus();
	})

	$('table>tbody>tr').click(event => {
		var dataSet = event.currentTarget.dataset

		if (dataSet.action) {
			location.assign(`${dataSet.action}/${dataSet.id}`)
		}
	})

	$('.clickMethod').click(event => {
		var dataSet = event.currentTarget.dataset
		location.assign(`${dataSet.action}/${dataSet.apiid}/${dataSet.methodid}`)
	})

	$('.clickApiTable').click(event => {
		var dataSet = event.currentTarget.dataset
		location.assign(`${dataSet.action}/${dataSet.apiid}/${dataSet.apitableid}`)
	})

	$('[data-toggle='tooltip']').tooltip()
})
