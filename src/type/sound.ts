
export interface Sound {
	keyCode: number;
	keyTrigger: string;
	id: string;
	url: string;
}

export interface Bank {
	id: string;
	name: string;
	sounds: Sound[];
}
