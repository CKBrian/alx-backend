#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        '''
        Returns a dictionary with the following key-value pairs:
        index: the current start index of the return page.
        next_index: the next index to query with.
        page_size: the current page size
        data: the actual page of the dataset
        '''
        if self.__indexed_dataset is None:
            self.indexed_dataset()

        dataset = self.__indexed_dataset
        assert index is not None and index >= 0 and index < len(dataset)

        next_index = index + page_size
        keys = list(dataset.keys())

        curr_keys = [idx for idx in range(index, next_index) if idx in keys]

        if len(curr_keys) == page_size:
            data = [dataset[idx] for idx in curr_keys]
            next_index = index + len(data)
        else:
            data = []
            for idx in range(index, len(dataset)):
                if idx in keys:
                    data.append(dataset[idx])
                if len(data) == page_size:
                    next_index = idx + 1
                    break

        return {
            'index': index,
            'next_index': next_index,
            'page_size': page_size,
            'data': data,
        }
