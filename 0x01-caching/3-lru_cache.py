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
            if key not in self.LRU_items:
                self.LRU_items.append(key)
            else:
                index = self.LRU_items.index(key)
                self.LRU_items.pop(index)
                self.LRU_items.append(key)
            if len(self.LRU_items) > self.MAX_ITEMS:
                self.cache_data.pop(self.LRU_items[0])
                print(f'DISCARD: {self.LRU_items[0]}')
                self.LRU_items.pop(0)
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
