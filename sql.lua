local sql = {
	ApiUrl = "http://example.tld", -- Do not use a trailing slash.
	Token = "_:USE TOKEN SETUP IN SERVER:_",
}
local http = game:GetService'HttpService';
local dummyFunction = function()end;
function sql:PostAsync(Table, Key, Value, Callback)
	if (Table == nil) then
		return error("Table is unspecified", 0);
	elseif (Key == nil) then
		return error("Key is unspecified", 0);
	elseif (Value == nil) then
		return error("Value is unspecified", 0);
	elseif (Callback == nil) then
		Callback = dummyFunction;
	end
	
	spawn(function()
		local data = http:RequestAsync({
			Url = sql.ApiUrl .. "/postAsync",
			Method = "POST",
			Headers = {
				ApiToken = sql.Token,
				["Content-Type"] = "application/json"
			},
			Body = http:JSONEncode{
				Key = Key,
				Value = Value,
				Table = Table
			}
		})
		local validJson, Resp = pcall(function()
			return http:JSONDecode(data.Body);
		end)
		if (validJson) then
			if (data.StatusCode == 200) then
				Callback(true, Resp);
			else
				Callback(false, "Request did not succeed. [" .. data.StatusCode .. "]", Resp);
			end
		else
			Callback(false, "Server returned invalid response", data.Body)
		end
	end)
end

function sql:DeleteAsync(Table, Key, Callback)
	if (Table == nil) then
		return error("Table is unspecified", 0);
	elseif (Key == nil) then
		return error("Key is unspecified", 0);
	elseif (Callback == nil) then
		Callback = dummyFunction;
	end
	
	spawn(function()
		local data = http:RequestAsync({
			Url = sql.ApiUrl .. "/deleteAsync",
			Method = "DELETE",
			Headers = {
				ApiToken = sql.Token,
				["Content-Type"] = "application/json"
			},
			Body = http:JSONEncode{
				Key = Key,
				Table = Table
			}
		})
		local validJson, Resp = pcall(function()
			return http:JSONDecode(data.Body);
		end)
		if (validJson) then
			if (data.StatusCode == 200) then
				Callback(true, Resp);
			else
				Callback(false, "Request did not succeed. [" .. data.StatusCode .. "]", Resp);
			end
		else
			Callback(false, "Server returned invalid response", data.Body)
		end
	end)
end


function sql:GetAsync(Table, Key, Callback)
	if (Table == nil) then
		return error("Table is unspecified", 0);
	elseif (Key == nil) then
		return error("Key is unspecified", 0);
	elseif (Callback == nil) then
		return error("Callback is unspecified", 0);
	end
	
	spawn(function()
		local data = http:RequestAsync({
			Url = sql.ApiUrl .. "/getAsync",
			Method = "POST",
			Headers = {
				ApiToken = sql.Token,
				["Content-Type"] = "application/json"
			},
			Body = http:JSONEncode{
				Key = Key,
				Table = Table
			}
		})
		local validJson, Resp = pcall(function()
			return http:JSONDecode(data.Body);
		end)
		if (validJson) then
			if (data.StatusCode == 200) then
				Callback(true, Resp);
			else
				Callback(false, "Request did not succeed. [" .. data.StatusCode .. "]", Resp);
			end
		else
			Callback(false, "Server returned invalid response", data.Body);
		end
	end)
end

return sql;
