import os
import yaml #pip install pyyaml
from PIL import Image #pip install Pillow
def get_color(filepath):#return dict{int : (r,g,b)}
    label_file=open(filepath+'/info.yaml',encoding='utf-8')
    labels=yaml.load(label_file)
    labels_len=len(labels['label_names'])
    img=Image.open(filepath+'/label_viz.png')
    color_dict={}
    #最下面色块中间值坐标为（890,1963），每次向上移动90（针对1536x2048的label_viz而言）
    for i in range(labels_len):
        r,g,b=img.getpixel((890,1963-90*(labels_len-i-1)))
        color_dict[i]=(r,g,b)
    return color_dict