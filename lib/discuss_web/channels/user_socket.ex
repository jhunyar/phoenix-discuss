defmodule DiscussWeb.UserSocket do
  use Phoenix.Socket

  channel "comments:*", Discuss.CommentsChannel

  # channel "room:*", DiscussWeb.RoomChannel

  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
