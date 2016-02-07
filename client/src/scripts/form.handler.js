/**
 * Created by jgluhov on 07/02/16.
 */
import 'rxjs';
import 'rx-dom';

export default class FormHandler {

	constructor(formId) {
		this.form = document.getElementById('controlsForm');
		this.host = 'http://localhost';
		this.port = '1337';
		this.route = 'triangulate'
	}

	observe() {
		return Rx.Observable.fromEvent(this.form, 'submit')
			.map(e => {
				e.preventDefault();
				return e.target.elements;
			})
			.map((elements) => {
				return {
					length: elements.boxLength.value,
					width: elements.boxWidth.value,
					height: elements.boxHeight.value
				}
			})
			.filter(dimensions => {
				return !isEmpty(dimensions.length) && !isEmpty(dimensions.width) && !isEmpty(dimensions.height)
			})
			.map(dimensions => {
				return dimensions;
			})
			.debounce(500)
			.distinctUntilChanged()
			.flatMapLatest(dimensions => Rx.DOM.ajax({
				method: 'GET',
				url: `${this.host}:${this.port}/${this.route}?
				length=${dimensions.length}&
				width=${dimensions.width}&
				height=${dimensions.height}`,
				responseType: 'json'
			}))
			.map(r => r.response);
	}
}

function isEmpty(str) {
	return (/^\s+$|^$/gi.test(str));
}