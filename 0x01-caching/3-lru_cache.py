#!/usr/bin/python3
""" LRUCache module
"""
BaseCaching = __import__('base_caching').BaseCaching
from collections import OrderedDict


class LRUCache(BaseCaching):
    """ LRUCache defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.LRU_items = []
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if key in self.LRU_items:
                self.cache_data.move_to_end(key)
            if len(self.cache_data) > self.MAX_ITEMS:
                deleted_key, val = self.cache_data.popitem(last = False)
                print(f'DISCARD: {deleted_key}')
            self.cache_data[key] = item
            print(self.cache_data)

    def get(self, key):
        """ Get an item by key
        """
        if key and key in self.cache_data:
            self.cache_data.move_to_end(key)
            print(self.cache_data)
            return self.cache_data[key]
        else:
             None
