// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {State} from '../State';
import * as types from '../types';

/** <xsd:documentation>
  * Works like a comment usable in almost any part of the schema. */

export class Documentation extends types.Base {
	init(state: State) {
		state.startText(this);
	}

	addText(state: State, text: string, elementName: string) {
		var isEmpty = text.trim().length === 0;
		var header = '';
		if (!isEmpty && elementName) {
			if (elementName.indexOf(':') >= 0) {
				elementName = elementName.split(':')[1];
			}
			header = elementName + ': '
		}
		this.commentList.push(header + text);
	}

	loaded(state: State) {
		state.endText();
	}

	resolve(state: State) {
		this.scope.addCommentsToGrandParent(this.commentList);
	}

	commentList: string[] = [];
}
