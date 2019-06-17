FROM sebp/elk:701

ENV ES_HOME /opt/elasticsearch
WORKDIR ${ES_HOME}

RUN yes | CONF_DIR=/etc/elasticsearch gosu elasticsearch bin/elasticsearch-plugin \
    install -b analysis-smartcn
RUN yes | CONF_DIR=/etc/elasticsearch gosu elasticsearch bin/elasticsearch-plugin \
    install -b analysis-kuromoji
