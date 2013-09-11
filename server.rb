#!/usr/bin/ruby

# * * * * * * *
# * bamboo.js *
# * * * * * * *
# * v0.9b * * *
# * * * * * * *

require 'websocket-eventmachine-server'
require 'base64'

def generate_template
  in_file = File.read("template.dat")
  return "<script src='http://localhost/bamboo/helper.js'></script>" + in_file
end

EM.run do
  WebSocket::EventMachine::Server.start(:host => "0.0.0.0", :port => 10933) do |ws|
    ws.onmessage do |data, type|
      chunk = [generate_template + "\n<script>", "</script>\n</html>"]
      File.open("bamboo.log", "w") { |f| f.write(chunk[0] + data + chunk[1]) }
      ws.send Base64.encode64(chunk[0] + data + chunk[1]), :type => type
    end
  end
end
