'use client';

import { BiSearch } from 'react-icons/bi';

interface SearchProps {}

const Search = ({}: SearchProps) => {
	return (
		<div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex flex-row items-center justify-between">
				<div className="px-3 text-sm font-semibold lg:px-6">
					Anywhere
				</div>
				<div className="hidden sm:block text-sm font-semibold px-3 lg:px-6 border-x-[1px] flex-1 text-center">
					Any Week
				</div>
				<div className="flex flex-row items-center gap-1.5 lg:gap-3 pl-3 text-sm text-gray-600 lg:pl-6">
					<div className="hidden sm:block">Add Guests</div>
					<i className="p-2 text-lg text-white rounded-full bg-rose-500">
						<BiSearch />
					</i>
				</div>
			</div>
		</div>
	);
};

export default Search;
