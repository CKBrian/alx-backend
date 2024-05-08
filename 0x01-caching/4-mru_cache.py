#!/usr/bin/python3
""" MRUCache module
"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.MRU_items = []
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if key in self.cache_data:
                self.cache_data.move_to_end(key)
            else:
                if len(self.cache_data) >= self.MAX_ITEMS:
                    deleted_key, val = self.cache_data.popitem(last=True)
                    print(f'DISCARD: {deleted_key}')
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key and key in self.cache_data:
            self.cache_data.move_to_end(key)
            return self.cache_data[key]
        else:
            None
