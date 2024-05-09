#!/usr/bin/python3
""" LFUCache module
"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.item_freq = {}
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if key not in self.item_freq:
                self.item_freq[key] = 0
            if key in self.cache_data:
                self.cache_data.move_to_end(key)
            else:
                if len(self.cache_data) >= self.MAX_ITEMS:
                    # finds the least frequency from the item_freq dictionary
                    sorted_dict = dict(sorted
                                       (self.item_freq.items(),
                                        key=lambda x: x[1], reverse=True))
                    l_freq_key = list(sorted_dict.keys())[-2]
                    least_freq = self.item_freq[l_freq_key]

                    # finds the least frequently used item
                    del_key = [d_key for d_key in self.cache_data.keys()
                               if self.item_freq[d_key] == least_freq]

                    # Delete the item from the cache dictionary
                    self.cache_data.pop(del_key[0])
                    self.item_freq.pop(del_key[0])
                    print(f'DISCARD: {del_key[0]}')
            self.item_freq[key] += 1
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key and key in self.cache_data:
            self.item_freq[key] += 1
            return self.cache_data[key]
        else:
            None
